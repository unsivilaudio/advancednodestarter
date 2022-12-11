import safeBuffer from 'safe-buffer';
import Keygrip from 'keygrip';
import keys from '../../config/keys';

const Buffer = safeBuffer.Buffer;

export default function (user) {
    const sessionObject = {
        passport: {
            user: user._id.toString(),
        },
    };
    const session = Buffer.from(JSON.stringify(sessionObject)).toString(
        'base64'
    );

    const keygrip = new Keygrip([keys.cookieKey]);
    const sig = keygrip.sign('session=' + session);

    return { session, sig };
}
