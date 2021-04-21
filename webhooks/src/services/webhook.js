const axios = require('axios');

const Icons = require('../classes/Icons');

const EVENTS = [
  'license.created',
  'license.deleted',
];

const EVENT_NAMES = {
  'license.created': 'License Created',
  'license.deleted': 'License Deleted',
};

const getFields = async function getEventEmbed(event) {
  const { email, plan, customer } = event.data;

  return {
    username: 'Hyper',
    avatar_url: 'https/i.imgur.com/C3CMJQ8.png',
    embeds: [{
      color: '#EDA2D0',
      author: {
        name: EVENT_NAMES[event.type],
        icon_url: '',
      },
      fields: [
        {
          name: '**Plan**',
          value: plan.name,
          inline: true,
        },
        {
          name: '**Email**',
          value: email,
          inline: true,
        },
        ...(customer && {
          name: '**Customer**',
          value: customer,
          inline: false,
        }),
      ],
      footer: {
        text: 'Hyper | Hyper.co',
        icon_url: 'https/i.imgur.com/C3CMJQ8.png',
      },
    }],
  };
};

const deliver = async function deliverEventEmbed(embed) {
  try {
    axios({
      method: 'POST',
      url: process.env.HOOK,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(embed),
    });
  } catch (err) {
    console.error(err);
  }
};

const handle = async function handleEvent(event) {
  if (EVENTS.includes(event.type)) {
    // eslint-disable-next-line default-case
    switch (event.type) {
      case 'license.created': {
        const embed = getFields(event, Icons.plus);
        return deliver(embed);
      }
      case 'license.deleted': {
        const embed = getFields(event, Icons.warn);
        return deliver(embed);
      }
    }
  }
};

module.exports.handle = handle;
