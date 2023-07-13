const Airtable = require('airtable-node')
const airtable = new Airtable({ apiKey: 'keytqDL3grsIaqqZl' })
  .base('app64firN7QLVSQMG')
  .table('products')

exports.handler = async (event, context, cb) => {
  try {
    const { records } = await airtable.list()
    const products = records.map((product) => {
      const { id } = product
      const {
        name,
        images,
        price,
        colors,
        company,
        description,
        category,
        shipping,
        featured,
        farmers_location,
      } = product.fields
      const image = images[0].url
      return {
        id,
        name,
        price,
        image,
        colors,
        company,
        description,
        category,
        shipping,
        featured,
        farmers_location,
      }
    })
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 200,
      body: JSON.stringify(products),
    }
  } catch (error) {}
}
