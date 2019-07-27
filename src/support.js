const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');

// Scene for description button
const descrScene = new Scene('support');
descrScene.enter(async ctx => await ctx.reply(
  '🔹 /protein: Виды протеина, польза\n' +
  '🔹 /creatine: Креатин и как его принимать\n' +
  '🔹 /vitamins: Витамины и польза\n' +
  '🔹 /payment: Как проходит оплата\n' +
  '🔹 /delivery: Доставка\n' +
  '🔹 /support: Поддержка'
));
descrScene.leave(async ctx => await ctx.reply('Leave from support'));
descrScene.on('message', async ctx => {
  await ctx.reply(
    'It is description scenes',
    Markup.inlineKeyboard([
      Markup.callbackButton('◀️ Back', 'back_to_main'),
      Markup.callbackButton('🖊 Edit', 'get_number')
    ]).extra()
  )
});

module.exports = descrScene;