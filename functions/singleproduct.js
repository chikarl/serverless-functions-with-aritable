const Airtable = require('airtable-node')
const airtable = new Airtable({ apiKey: 'keytqDL3grsIaqqZl' })
  .base('app64firN7QLVSQMG')
  .table('products')

exports.handler = async (event, context, cb) => {
  const { id } = event.queryStringParameters
  if (id) {
    try {
      const product = await airtable.retrieve(id)
      if (product.error) {
        return {
          statusCode: 400,
          body: `No Product with an id of ${id}`,
        }
      }
      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        statusCode: 200,
        body: JSON.stringify(product.fields),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Sorry No Product`,
      }
    }
  }
  return {
    statusCode: 400,
    body: 'Please provide product id ',
  }
}
