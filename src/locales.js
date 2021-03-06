module.exports = {
  ru: {
    start(ctx) {return `Приветствую Вас, *${ctx.message.from.first_name}*.\nЧтобы сделать заказ - нажмите _Приобрести_`},
    pay(amount) {return `✅Оплатить ${amount}грн`},
    main_menu_btn: '🏠Главное меню',
    back_to_main_menu: '🎉 Вы вернулись в главное меню 🎉',
    order_btn: 'Приобрести🔍',
    support_btn: 'Поддержка✍️',
    protein_btn: 'Протеин 🍼',
    creatin_btn: 'Креатин 💪',
    vitamin_btn: 'Витамины 💊',
    buy: 'Купить',
    choose_more: 'Выбрать еще',
    protein_type_quest: 'Какой вид протеина желаете ?',
    creatine_type_quest: 'Какой вид креатина желаете ?',
    vitamin_type_quest: 'Какие витамины желаете ?',
    packages_number_quest: 'Сколько упаковок хотите купить ?',
    category_quest: 'Выберите категорию товара:',
    protein_type_whey: 'Сывороточный',
    protein_type_casein: 'Казеиновый',
    like: 'Нравится ?',
    wrong_number: 'Похоже, Вы ввели неправильное значение,\nэто должно быть натуральное число',
  },
  ua: {
    start(ctx) {return `Вітаю Вас, *${ctx.message.from.first_name}*.\nЩоб зробити замовлення - натисніть _Придбати_`},
    pay(amount) {return `✅Оплатити ${amount}грн`},
    main_menu_btn: '🏠Головне меню',
    back_to_main_menu: '🎉 Ви повернулись до головного меню 🎉',
    order_btn: 'Придбати🔍',
    support_btn: 'Підтримка✍️',
    protein_btn: 'Протеїн 🍼',
    creatin_btn: 'Креатин 💪',
    vitamin_btn: 'Вітаміни 💊',
    buy: 'Купити',
    choose_more: 'Вибрати ще',
    protein_type_quest: 'Якій вид протеїну бажаєте ?',
    creatine_type_quest: 'Який вид креатину бажаєте ?',
    vitamin_type_quest: 'Які вітаміни бажаєте ?',
    packages_number_quest: 'Скільки пакунків бажаєте купити ?',
    category_quest: 'Виберіть категорію товару:',
    protein_type_whey: 'Сироватковий',
    protein_type_casein: 'Казеїновий',
    like: 'Подобається ?',
    wrong_number: 'Схожу, Ви ввели невірний значення,\nце має бути натульне число',
  }
};
