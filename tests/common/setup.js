// setup.js

import { environment } from './env';

fixture `Global Setup`
    .page `${environment.baseUrl}/login`
    .beforeEach(async t => {
        await t.setTestSpeed(1);
        console.log('Global setup before each test');
    });
