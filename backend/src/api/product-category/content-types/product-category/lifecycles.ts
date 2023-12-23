import slugify from 'slugify';

module.exports = {
  beforeCreate(event: any) {
    const { data } = event.params;
    if (data.name && !data.slug) {
      data.slug = slugify(data.name, { lower: true });
    }
  },
  beforeUpdate(event: any) {
    const { data } = event.params;
    if (data.name && !data.slug) {
      data.slug = slugify(data.name, { lower: true });
    }
  },
};
