import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TidioService {
    showTidio() {
        const tidio = document.querySelector('#tidio-chat') as HTMLElement;
        if (tidio) {
            tidio.style.display = 'block';
        }
    }

    hideTidio() {
        const tidio = document.querySelector('#tidio-chat') as HTMLElement;
        if (tidio) {
            tidio.style.display = 'none';
        }
    }

    removeDefaultTidioScript(): void {
        const scriptTidio = document.getElementById('tidio-script');
        if (scriptTidio) {
            scriptTidio.remove();
        }
    }

    createDefaultTidioScript(): void {
        const scriptContainer = document.createElement('div');
        scriptContainer.setAttribute('id', 'tidio-script');

        const pcpTidio = document.createElement('script');
        pcpTidio.setAttribute('type', 'text/javascript');
        pcpTidio.setAttribute(
            'src',
            '//code.tidio.co/ktweo3wqje2kyuf879af5gnmbqfiptzl.js'
        );
        scriptContainer.appendChild(pcpTidio);

        document.body.appendChild(scriptContainer);
    }

    removeBoothTidioScript(): void {
        const boothTidio = document.getElementById('booth-script-container');
        if (boothTidio) {
            const tidioChatIframe = document.querySelector('#tidio-chat-code');
            if (tidioChatIframe) {
                tidioChatIframe.remove();
            }

            const tidioChat = document.querySelector('#tidio-chat');
            if (tidioChat) {
                tidioChat.remove();
            }
            boothTidio.remove();
        }
    }
}
