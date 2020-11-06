import puppeteer from 'puppeteer';
import sessionFactory from './factories/sessionFactory';

let browser, page;

beforeEach(async () => {
    browser = await puppeteer.launch({
        headless: false,
    });
    page = await browser.newPage();
    await page.goto('localhost:3000');
});

afterEach(async () => {
    await browser.close();
});

test('The header has the correct text', async () => {
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);

    expect(text).toEqual('Blogster');
});

test('Clicking login starts oauth flow', async () => {
    await page.click('.right a');
    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/);
});

test.only('when signed in, shows logout button', async () => {
    const _id = '5fa2f8aede492053443d7fab';

    const factory = sessionFactory({ _id });

    await page.setCookie({ name: 'session', value: factory.session });
    await page.setCookie({ name: 'session.sig', value: factory.sig });
    await page.goto('localhost:3000');
    await page.waitFor('a[href="/auth/logout"]');

    const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);
    expect(text).toEqual('Logout');
});
