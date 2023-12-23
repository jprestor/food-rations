'use strict';

/* eslint-disable no-unused-vars */
module.exports = (config, webpack) => {
  // config.plugins.push(
  //   new webpack.DefinePlugin({
  //     CONTENT_TYPES: JSON.stringify(
  //       [
  //         {
  //           from: 'api::topic.topic', // collection where button will be added
  //           to: 'api::card.card', // which collection you want to filter
  //           filterBy: 'title', // field name by which you want to filter
  //           attributeName: 'viewCards', //attribute name added while adding button
  //           buttonTitle: 'View Cards', // title of button
  //         },
  //         {
  //           from: 'api::category.category',
  //           to: 'api::topic.topic',
  //           filterBy: 'title',
  //           attributeName: 'viewTopics',
  //           buttonTitle: 'View Topics',
  //         },
  //         {
  //           from: 'api::category.category', //adding multiple buttons for same collection
  //           to: 'api::card.card',
  //           filterBy: 'title',
  //           attributeName: 'viewCards',
  //           buttonTitle: 'View Cards',
  //         }
  //       ]
  //     ),
  //   })
  // )
  return config;
};
