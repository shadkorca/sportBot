const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const data = require('../data');

const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const WizardScene = require('telegraf/scenes/wizard');

const bot = new Telegraf(data.token);

const order = new WizardScene(
  'order',
  ctx => {
    ctx.reply('Stage 1');
    return ctx.wizard.next()
  },
  ctx => {
    ctx.reply('Stage 2');
    return ctx.wizard.next()
  },
  ctx => {
    if (ctx.message.text === 'back')
      ctx.wizard.back();

    ctx.reply('Stage 3');
    return ctx.wizard.next()
  },
  ctx => {
    ctx.reply('Stage 4 - final');
    return ctx.scene.leave();
  }
);

const stage = new Stage();

stage.register(order);

bot.use(session());
bot.use(stage.middleware());
// bot.use(Telegraf.log());

bot.action('order', ctx => ctx.scene.enter('order'));

bot.start((ctx) => {
  ctx.reply("Выберите действие.", Markup.inlineKeyboard([
    Markup.callbackButton("Список доступных матчей", "groups"),
    Markup.callbackButton("Создать новый матч", "order")
  ]).extra());
});


bot.launch()