const Telegraf = require('telegraf');
const data = require('./data');
const {CartHandler} = require('./utils');
const tr = require('./locales');

const {Markup} = Telegraf;
const {Extra} = Telegraf;
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const WizardScene = require('telegraf/scenes/wizard');
const Composer = require('telegraf/composer');
const Scene = require('telegraf/scenes/base');

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

let cart = [];
let Cart = new CartHandler();
let wizard_anchor = 0;
let userLocale = 'ua';

const mainMenuButton = [Markup.callbackButton(tr[userLocale].main_menu_btn, 'back_to_main')];

const keyboard = Markup.inlineKeyboard([[
  Markup.callbackButton(tr[userLocale].order_btn, 'order'),
  Markup.callbackButton(tr[userLocale].support_btn, 'description')
]]).extra();

// const keyboard_home = Markup.keyboard([
//   Markup.callbackButton('Приобрести🔍', 'order'),
//   Markup.callbackButton('Поддержка✍️', 'description')
// ]).extra();

// const inlineRatingKeyboard = Markup.inlineKeyboard([
//   Markup.callbackButton('👍', 'like'),
//   Markup.callbackButton('👎', 'dislike')
// ]).extra();

// const buyKeyboard = Markup.inlineKeyboard([
//   [Markup.callbackButton(tr[userLocale].buy, 'buy')],
//   mainMenuButton
// ]).extra();


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


// steps handlers

// const choosenProductHandler = new Composer();
// choosenProductHandler.action('protein', async ctx => {
//   Cart.createOrder('protein');
//
//   await ctx.reply(tr[userLocale].protein_type_quest, Markup.inlineKeyboard([
//     [
//       Markup.callbackButton(tr[userLocale].protein_type_whey, 'suvorotka'),
//       Markup.callbackButton(tr[userLocale].protein_type_casein, 'kazein')
//     ],
//     mainMenuButton
//   ]).extra());
//   return ctx.wizard.next()
// });
// choosenProductHandler.action('creatin', async ctx => {
//   Cart.createOrder('creatin');
//
//   await ctx.reply(tr[userLocale].creatine_type_quest, Markup.inlineKeyboard([
//     // todo: creatin label
//     [Markup.callbackButton('Creatin', 'creatin')],
//     mainMenuButton
//   ]).extra());
//   return ctx.wizard.next()
// });
// choosenProductHandler.action('vitamin', async ctx => {
//   Cart.createOrder('vitamin');
//
//   await ctx.reply(tr[userLocale].vitamin_type_quest, Markup.inlineKeyboard([
//     // todo: vitamin label
//     [Markup.callbackButton('Vitamin', 'vitamin')],
//     mainMenuButton
//   ]).extra());
//   return ctx.wizard.next()
// });
// choosenProductHandler.action('back_to_main', async ctx => {
//   await ctx.editMessageText(tr[userLocale].back_to_main_menu);
//   // todo: clear cart ?\
//   return  ctx.scene.leave('order')
// });
// choosenProductHandler.use(async ctx => await ctx.reply('It is order Step handler'));


// const pureChoosenProductHandler = new Composer();
// pureChoosenProductHandler.action('suvorotka', async ctx => {
//   await ctx.reply('Whey protein', buyKeyboard);
//   return ctx.wizard.next()
// });
// pureChoosenProductHandler.action('kazein', async ctx => {
//   await ctx.reply('Casein protein', buyKeyboard);
//   return ctx.wizard.next()
// });
// pureChoosenProductHandler.action('creatin', async ctx => {
//   await ctx.reply('Creatin', buyKeyboard);
//   return ctx.wizard.next()
// });
// pureChoosenProductHandler.action('vitamin', async ctx => {
//   await ctx.reply('Vitamin', buyKeyboard);
//   return ctx.wizard.next()
// });
// pureChoosenProductHandler.action('back_to_main', async ctx => {
//   await ctx.editMessageText(tr[userLocale].back_to_main_menu, keyboard);
//   return ctx.scene.leave('order')
// });
// pureChoosenProductHandler.use(async ctx => await ctx.reply('Chose a type of protein or click back'));


// const numberOfPackeges = new Composer();
// numberOfPackeges.action('back_to_main', async ctx => {
//   await ctx.editMessageText(tr[userLocale].back_to_main_menu, keyboard);
//   return ctx.scene.leave('order')
// });
// numberOfPackeges.action('buy', async ctx => {
//   await ctx.reply(tr[userLocale].packages_number_quest);
//   return ctx.wizard.next()
// });
// numberOfPackeges.use(async ctx => await ctx.reply(tr[userLocale].packages_number_quest));


// const cartStep = new Composer();
// cartStep.use(async ctx => {
//     if (!ctx.message) {
//       console.log('ctx message', ctx.message);
//       return
//     }
//
//     await Cart.updateOrder(ctx.message.text);  // если неправильное число - ошибка
//     if (Cart.error) {
//       // вопрос будет висеть либо до правильного ввода, либо до выхода в главное меню
//       return await ctx.reply(Cart.error, Markup.inlineKeyboard([mainMenuButton]));
//     }
//
//     await Cart.updateCart();
//
//     const amount = await Cart.calculateAmount();
//
//     await ctx.reply(`The chosen good are cost ${amount}💵 -final step`,
//       Markup.inlineKeyboard([
//         [Markup.callbackButton(tr[userLocale].pay(amount), 'pay')],
//         [Markup.callbackButton(tr[userLocale].choose_more, 'vubrat')],
//         mainMenuButton
//       ]).extra());
//     return ctx.wizard.next();
// });


// const ratingStep = new Composer();
// ratingStep.action('like', async ctx => {
//   await ctx.editMessageText('🎉 Awesome! 🎉');
//   // todo: send rating
//   return ctx.scene.leave('order')
// });
// ratingStep.action('dislike', async ctx => {
//   await ctx.editMessageText('okey');
//   // todo: send rating
//   return ctx.scene.leave('order')
// });
// ratingStep.action('vubrat', async ctx => {
//   await ctx.reply('I want MORE and MORE');
//   return ctx.wizard.selectStep(wizard_anchor);
// });
// ratingStep.action('pay', async ctx => {
//   await ctx.reply(tr[userLocale].like, inlineRatingKeyboard);
//   return Cart.clearCart();
//   // return ctx.scene.leave('order')
// });
// ratingStep.use(async ctx => await ctx.reply(tr[userLocale].like, inlineRatingKeyboard));


// // main wizard
// const order = new WizardScene(
//   'order',
//   async ctx => {
//     await ctx.reply(tr[userLocale].category_quest,
//       Markup.inlineKeyboard([
//         [Markup.callbackButton(tr[userLocale].protein_btn, 'protein')],
//         [Markup.callbackButton(tr[userLocale].creatin_btn, 'creatin')],
//         [Markup.callbackButton(tr[userLocale].vitamin_btn, 'vitamin')],
//         mainMenuButton
//       ]).extra()
//     );
//
//     wizard_anchor = ctx.wizard.cursor;
//     return ctx.wizard.next();
//   },
//   choosenProductHandler,
//   pureChoosenProductHandler,
//   numberOfPackeges,
//   cartStep,
//   ratingStep
// );
// order.leave(ctx => ctx.reply(tr[userLocale].main_menu_btn));

const order = require('./wizard');
const descrScene = require('./support');

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
