const Telegraf = require('telegraf');
const data = require('./data');
const tr = require('./locales');

const {Markup} = Telegraf;
const session = require('telegraf/session');
const Stage = require('telegraf/stage');

const order = require('./wizard');
const descrScene = require('./support');

const bot = new Telegraf(data.token);

// =========Challenges========
/*
1) Поставить иконку - какую ?
2) Разделить приложение по блокам
4) Прикрутить БД Монго
5) Добавить шаг доставки НП
6) Продумать структуру БД
7) Добавить обратную связь с админом
8) Добавить отправку номера накладной клиенту
9) Описание страницы поддержки
10) Перед оплатой показывать все выбранные товары
11) Краткое описание работы бота
 */


// Payment 💵 🔙🏠🚚
// "keyboards": {
//   "back_keyboard": {
//     "back": "◀️ Назад"
//   },
//   "main_keyboard": {
//     "search": "👀 Поиск",
//       "movies": "🎥 Моя коллекция",
//       "settings": "⚙️ Настройки",
//       "about": "❓ Обо мне",
//       "support": "💰 Поддержать️ ",
//       "contact": "✍️ Обратная связь"
//   }

let userLocale = 'ua';

const mainMenuButton = [Markup.callbackButton(tr[userLocale].main_menu_btn, 'back_to_main')];

const keyboard = Markup.inlineKeyboard([[
  Markup.callbackButton(tr[userLocale].order_btn, 'order'),
  Markup.callbackButton(tr[userLocale].support_btn, 'description')
]]).extra();

bot.start(async ctx => {
  userLocale = ctx.message.from.language_code;
  await ctx.replyWithMarkdown(tr[userLocale].start(ctx), keyboard);
  console.log(ctx.message.from);
});

function checkIfSuperAdmin(ctx, next) {
  if (ctx.from.id === data.dev_id) {
    ctx.reply('Great, you are admin');
    return next()
  } else {
    return ctx.reply('Sorry, you are not admin');
  }
}


const stage = new Stage();
stage.register(order, descrScene);
bot.use(session());
bot.use(stage.middleware());

bot.action('order', async ctx => await ctx.scene.enter('order'));

bot.action('description', async ctx => await ctx.scene.enter('support'));

bot.action('back_to_main', async ctx => await ctx.scene.leave('support'));

bot.command('hey', async ctx => {
  ctx.scene.leave('order');
  ctx.scene.leave('support');
  await ctx.reply(tr[userLocale].back_to_main_menu, keyboard)
});


// command methods

bot.command('is_admin', checkIfSuperAdmin, ctx => {
  console.log('next middleware')
});

// ON-methods
bot.on('message',  async ctx => {
  await ctx.replyWithMarkdown(tr[userLocale].start(ctx), keyboard)
});

bot.catch(async err => await console.log('Ooops', err));

bot.launch();
