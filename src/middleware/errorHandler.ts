import { Context, Next } from 'koa';
import AppError from './AppError'; 
import i18n from './i18n'; 

export async function errorHandler(ctx: Context, next: Next) {
  try {
    const languageCode = 'hi'; 
i18n.changeLanguage(languageCode);
    await next();
  } catch (error) {
    console.error('Error:', error);

    if (error instanceof AppError) {
      ctx.status = error.status || 500;
      ctx.body = { error: i18n.t(error.message) || 'Internal Server Error' };
    } else {
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
  }
}
