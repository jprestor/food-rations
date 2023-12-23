import slugify from 'slugify';

const generateSlug = (data) => {
  if (data.name && !data.slug) {
    data.slug = slugify(data.name, { lower: true });
  }
};

module.exports = {
  beforeCreate(event: any) {
    const { data } = event.params;
    generateSlug(data);
  },

  async beforeUpdate(event) {
    const {
      params: { data },
    } = event;
    generateSlug(data);
  },
};
