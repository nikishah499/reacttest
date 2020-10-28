import axiosHelper from '../helpers/axiosHelper';

function listProductsService(query) {
  let {page = 1, limit = 10} = query;
  if (page <= 0) {
    page = 1;
  }
  return axiosHelper.get('/api/products', {
    params: {
      page,
      limit
    }
  }).then(({data}) => data);
}

export default {listProductsService};
