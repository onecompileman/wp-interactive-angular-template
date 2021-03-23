import { Injectable } from '@angular/core';
import Talk from 'talkjs';
import { environment } from 'src/environments/environment';
import { sha256 } from 'js-sha256';

@Injectable({
    providedIn: 'root',
})
export class TalkService {
    private currentUser: Talk.User;

    async createUser(applicationUser: any) {
        await Talk.ready;
        return new Talk.User({
            id: `${environment.talkJs.userIdPrefix}-${applicationUser.id}`,
            name: applicationUser.username,
            photoUrl: applicationUser.photoUrl,
            role: 'guest',
        });
    }

    async createCurrentSession(user) {
        await Talk.ready;
        this.currentUser = await this.createUser(user);
        let hash = sha256.hmac.create(environment.talkJs.secretKey);
        hash.update(this.currentUser.id);
        const session = new Talk.Session({
            appId: environment.talkJs.appId,
            me: this.currentUser,
            signature: hash.hex(),
        });
        return session;
    }

    async getOrCreateConversation(
        session: Talk.Session,
        otherApplicationUser: any,
        isInbox = true
    ) {
        const otherUser = await this.createUser(otherApplicationUser);
        const conversation = session.getOrCreateConversation(
            Talk.oneOnOneId(this.currentUser, otherUser)
        );
        conversation.setParticipant(this.currentUser);
        conversation.setParticipant(otherUser);
        return conversation;
    }

    async createInbox(session: Talk.Session, otherApplicationUser) {
        const conversation = await this.getOrCreateConversation(
            session,
            otherApplicationUser
        );
        return session.createInbox({ selected: conversation });
    }

    async showAllInbox(session: Talk.Session) {
        return session.createInbox({
            showFeedHeader: false,
        });
    }
}
