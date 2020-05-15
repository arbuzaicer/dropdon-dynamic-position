/*
Checks:

const available = [240, 360, 720];
const allowed = [360, 720];
const preferred = [1080];

result = [360]
------------------------------------------------------------------------------------------------------------------------
const available = [240, 720];
const allowed = [360, 720];
const preferred = [1080];

result = [720]
------------------------------------------------------------------------------------------------------------------------
const available = [240];
const allowed = [360, 720];
const preferred = [1080];

result = []
------------------------------------------------------------------------------------------------------------------------
const available = [240, 360, 720];
const allowed = [240, 360, 720, 1080];
const preferred = [240, 360];

result = [240, 360]
------------------------------------------------------------------------------------------------------------------------
const available = [240, 720];
const allowed = [240, 360, 720, 1080];
const preferred = [240, 360];

result = [240, 720]
------------------------------------------------------------------------------------------------------------------------
const available = [240, 720];
const allowed = [240, 360, 1080];
const preferred = [240, 360];

result = [240]
------------------------------------------------------------------------------------------------------------------------
const available = [720];
const allowed = [240, 360, 1080];
const preferred = [240, 360];

result = []
------------------------------------------------------------------------------------------------------------------------
const available = [240, 360];
const allowed = [240, 360];
const preferred = [720, 1080];

result = [360]
------------------------------------------------------------------------------------------------------------------------
*/

const available = [240, 360];
const allowed = [240, 360];
const preferred = ['any', 1080];

const attempt = (available, allowed, preferred) => {
    // Сортую масиви відразу
    available = available.sort((a, b) => a - b);
    allowed = allowed.sort((a, b) => a - b);
    preferred = preferred.sort((a, b) => a - b);

    let result = [];
    let allowedRes = [];
    let preferRes;

    if(preferred.includes('any')) { // моя логіка така: якщо в масиві бажаних значень є 'any' - то бажаним є будь-яке із доступних значень
        return preferredContainsAny(available)
    }

    preferRes = available.filter(item => preferred.find(el => item === el));
    result = preferRes;

    if (!preferRes.length || preferRes.length === 1) {
        allowedRes = available.filter(item => allowed.find(el => item === el));
        if (allowedRes.length > 1) {
            if (allowedRes.includes(result[0])) {
                allowedRes = allowedRes.filter(item => item !== result[0])
            }
            result = [...result, compareClosest(preferred, allowedRes)];
        } else {
            result = Array.from(new Set(result.concat(allowedRes)));
        }

        if (!allowedRes.length) {
            result = [];
        }
    }

    return result;

};

function compareClosest(preferred, allowed) {
    const outData = [];
    preferred.forEach(item => {
        allowed.forEach(single => {
            const delta = item - single;
            outData.push({
                single, delta,
            });
        });
    });

    return outData.sort((a, b) => a.delta - b.delta)[0].single;
}

function preferredContainsAny(available) {
    return available[Math.floor(Math.random()*(available.length))];
}

attempt(available, allowed, preferred);
