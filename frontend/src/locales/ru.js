export default {
  translation: {
    navBar: {
      title: 'Hexlet Chat',
      logout: 'Выйти',
    },
    login: {
      title: 'Войти',
      submit: 'Войти',
      form: {
        username: 'Ваш ник',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        submitBtn: 'Зарегистрироваться',
      },
      noAccount: 'Нет аккаунта?',
      registration: 'Регистрация',
      invalidUsernameOrPW: 'Неверные имя пользователя или пароль',
    },
    signup: {
      title: 'Регистрация',
      altSignupImg: 'Регистрация',
      form: {
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        submitBtn: 'Зарегистрироваться',
        userAlreadyExists: 'Такой пользователь уже существует',
      },
    },
    pageNotFound: {
      title: 'Страница не найдена',
      message: 'Но вы можете перейти',
      linkHome: 'на главную страницу',
    },
    channels: {
      title: 'Каналы',
      channelControl: 'Управление каналом',
      remove: 'Удалить',
      rename: 'Переименовать',
    },
    messages: {
      messages_one: '{{count}} сообщений',
      messages_few: '{{count}} сообщения',
      messages_many: '{{count}} сообщений',
      send: 'Отправить',
    },
    status: {
      loading: 'Загрузка',
    },
    modals: {
      addChannel: 'Добавить канал',
      removeChannel: 'Удалить канал',
      renameChannel: 'Переименовать канал',
      channelName: 'Имя канала',
      areYouSure: 'Уверены?',
      remove: 'Удалить',
      cancel: 'Отменить',
      send: 'Отправить',
    },
    validation: {
      required: 'Обязательное поле',
      minmax: 'От 3 до 20 символов',
      channelAlreadyExists: 'Должно быть уникальным',
      min6: 'Не менее 6 символов',
      mustMatch: 'Пароли должны совпадать',
    },
    notifications: {
      channelCreated: 'Канал создан',
      channelRenamed: 'Канал переименован',
      channelDeleted: 'Канал удалён',
      connectionError: 'Ошибка соединения',
    },
  },
};
