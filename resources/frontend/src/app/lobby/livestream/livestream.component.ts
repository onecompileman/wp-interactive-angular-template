import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import * as p5 from 'p5';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { EMOJI_CONFIG } from 'src/app/core/config/emoji';
import { UserDataService } from 'src/app/core/data-services/user.data-service';
import { AssetsManager } from 'src/app/core/emoji/assets-manager';
import { Emoji } from 'src/app/core/emoji/emoji';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { SoundManagerService } from 'src/app/core/services/sound-manager.service';
import { TidioService } from 'src/app/core/services/tidio.service';
import { UiService } from 'src/app/core/services/ui.service';
import { WebsocketService } from 'src/app/core/services/websocket.service';
import { Modals } from 'src/app/shared/enums/modals.enum';
import {
    WebsocketChannels,
    WebsocketLocations,
} from 'src/app/shared/enums/websocket-channels.enum';

@Component({
    selector: 'app-livestream',
    templateUrl: './livestream.component.html',
    styleUrls: ['./livestream.component.scss'],
})
export class LivestreamComponent implements OnInit, OnDestroy {
    program: any;
    isReplay: boolean;
    isChatHidden: boolean;
    sketch: any;
    canvas: any;
    p: any;
    cboxUrl: string;

    scale: number = 0.5;

    referenceH = 401;
    referenceW = 307;

    assetsManager: any;
    emojiCanvasContainer: any;
    emojiQueue = [];

    isEmojisEnabled$: Observable<boolean>;
    subs = {};

    emojis = EMOJI_CONFIG;

    constructor(
        private tidioService: TidioService,
        private loadingService: LoadingService,
        private soundManagerService: SoundManagerService,
        private router: Router,
        private uiService: UiService,
        private userDataService: UserDataService,
        private websocketService: WebsocketService,
        private bsModalService: BsModalService,
        private modals: ModalService,
        private settingsService: SettingsService
    ) {}

    ngOnInit(): void {
        if (
            document.documentElement.clientWidth > 600 &&
            document.documentElement.clientHeight > 450
        ) {
            this.scale = 0.8;
        }

        this.loadingService.loading$.next(false);
        this.onWindowResize();
        this.onWindowOrientationChange();

        this.getLatestSettings();
        this.getProgram();
        this.livestreamEndListener();

        this.isEmojisEnabled$ = this.uiService.getEmojiState$();
        this.cboxUrl = this.settingsService.getSettingsSnapshot()?.cbox_url;

        this.websocketService.changeLocation(
            WebsocketLocations.LIVESTREAM,
            WebsocketChannels.LIVESTREAM
        );
    }

    ngAfterViewInit(): void {
        this.loadingService.loading$.next(false);
        setTimeout(() => {
            this.tidioService.hideTidio();
            this.soundManagerService.stopBackgroundMusic();
        }, 800);

        this.emojiCanvasContainer = document.getElementById(
            'emojiCanvasContainer'
        );
        this.initEmojiCanvas();
        this.emojiListener();
        this.settingsService.getAppSettings$().pipe(take(1)).subscribe();
    }

    ngOnDestroy(): void {
        this.tidioService.showTidio();
        this.soundManagerService.playBackgroundMusic();

        Object.keys(this.subs).forEach((key) => {
            if (this.subs.hasOwnProperty(key)) {
                this.subs[key].unsubscribe();
            }
        });
    }

    emote(emoji) {
        emoji.animate = true;
        // this.emojiQueue.push(emoji.type);
        this.userDataService.addEmoji(emoji.type).subscribe();

        setTimeout(() => {
            emoji.animate = false;
        }, 1500);
    }

    @HostListener('window:resize')
    onWindowResize(): void {
        document.documentElement.style.setProperty(
            '--app-height',
            `${window.innerHeight}px`
        );
        document.documentElement.style.height = '100%';
        this.onWindowOrientationChange();
    }

    @HostListener('window:orientationchange')
    onWindowOrientationChange(): void {
        document.documentElement.style.height = `initial`;
        setTimeout(() => {
            document.documentElement.style.height = `100%`;
            setTimeout(() => {
                // this line prevents the content
                // from hiding behind the address bar
                window.scrollTo(0, 1);
            }, 500);
        }, 500);
    }

    emojiListener(): void {
        window['Echo'].private('EmojiChannel').listen('EmojiEvent', (e) => {
            this.emojiQueue.push(e.emoji);
        });
    }

    backToLobby(): void {
        this.router.navigate(['/lobby/home']);
    }

    toggleChat(): void {
        this.isChatHidden = !this.isChatHidden;
    }

    openLivestreamFAQsModal(): void {}

    openProgram(): void {}

    private initEmojiCanvas() {
        this.sketch = (s) => {
            let canvas;
            let emojis = [];
            let emojiQueueingTime = 10;

            s.disableFriendlyErrors = true;

            s.preload = () => {
                if (!this.assetsManager) {
                    this.assetsManager = new AssetsManager(s);
                    this.assetsManager.loadAllAssets();
                }
            };

            s.setup = () => {
                this.p = s;
                canvas = s.createCanvas(
                    this.emojiCanvasContainer.clientWidth,
                    this.emojiCanvasContainer.clientHeight
                );
                canvas.parent('emojiCanvasContainer');
            };

            s.windowResized = () => {
                s.resizeCanvas(
                    this.emojiCanvasContainer.clientWidth,
                    this.emojiCanvasContainer.clientHeight
                );
            };

            s.draw = () => {
                s.background(255, 255, 255, 0);
                s.clear();
                if (s.frameCount % emojiQueueingTime === 0) {
                    if (this.emojiQueue.length > 0) {
                        Array(3)
                            .fill(1)
                            .forEach(() => {
                                const emojiToAdd = this.emojiQueue.shift();
                                if (emojiToAdd) {
                                    addEmoji(emojiToAdd);
                                }
                            });
                    }
                }

                renderEmojis();
            };

            let addEmoji = (emojiType) => {
                const emoji = new Emoji(
                    s,
                    this.assetsManager.emojiSprites[emojiType - 1],
                    s.createVector(
                        s.random(30 * this.scale, s.width - 30 * this.scale),
                        s.height + 30
                    ),
                    s.createVector(s.random(-0.5, 0.5), -1.5),
                    3 * this.scale,
                    this.scale
                );

                emojis.push(emoji);
            };

            let renderEmojis = () => {
                emojis = emojis.filter((emoji) => {
                    emoji.scale = this.scale;
                    emoji.update();
                    emoji.draw();

                    return !emoji.isDead();
                });
            };
        };

        this.canvas = new p5(this.sketch);
    }

    private getProgram(): void {
        this.uiService.getProgramState$().subscribe((program) => {
            this.program = program;
            this.isReplay = Boolean(program?.video_replay_url);
        });
    }

    private getLatestSettings(): void {
        this.settingsService.getAppSettings$().pipe(take(1)).subscribe();
    }

    private livestreamEndListener(): void {
        this.subs[
            'livestream-end'
        ] = this.uiService.getLivestreamEndState$().subscribe((isEnded) => {
            if (isEnded) {
                this.modals.addToQueue(Modals.LIVESTREAM_END);
            } else {
                this.modals.dequeue(Modals.LIVESTREAM_END);
            }
        });
    }
}
