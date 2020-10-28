import productService from '../../services/productService';
import { SET_PRODUCT_LIST } from '../reducers/productReducer';
import { SHOW_LOADER, HIDE_LOADER } from '../reducers/loaderReducer';

export const listProductsAction = (query) => {
    return (dispatch) => {
        dispatch({type: SHOW_LOADER});
        return productService.listProductsService(query)
            .then((response) => {
                dispatch({
                    type: SET_PRODUCT_LIST,
                    payload: {
                      productList: response.productList,
                      count: response.count
                    }
                });
                dispatch({type: HIDE_LOADER});
            }).catch((error) => {
              dispatch({type: HIDE_LOADER});
          });
    }
};
