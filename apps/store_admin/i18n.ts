import { getRequestConfig } from 'next-intl/server';

const a: any = getRequestConfig(async (): Promise<any> => {
    // Provide a static locale, fetch a user setting,
    // read from `cookies()`, `headers()`, etc.
    const locale = 'en';

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default
    };
});

export default a;