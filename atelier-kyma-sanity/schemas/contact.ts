export default {
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'E-mail',
      type: 'string',
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'website',
      title: 'Website',
      type: 'url',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
    {
      name: 'instagramName',
      title: 'Instagram Name',
      type: 'string',
    },
    {
      name: 'hours',
      title: 'Hours of Operation',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}
