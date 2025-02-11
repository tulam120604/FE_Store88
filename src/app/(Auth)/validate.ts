import * as yup from 'yup';

export const schemaValidateRegister = yup.object().shape({
    user_name: yup.string().min(3, 'Tên ít nhất 3 kí tự!').max(30, 'Tên không được phép vượt quá 30 kí tự!').required('Tên là bắt buộc!').optional(),
    email: yup.string().email('Email không hợp lệ!').required('Email là bắt buộc!'),
    password: yup.string().min(6, 'Mật khẩu ít nhất 6 kí tự!').required('Mật khẩu là bắt buộc!'),
});

export const schemaValidateOrder = yup.object().shape({
    name_user: yup.string().required('Tên là bắt buộc!'),
    email_user: yup.string().email('Email không hợp lệ!').required('Email là bắt buộc!'),
    phone: yup.string().min(10, 'Số điện thoại không hợp lệ!').max(10, 'Số điện thoại không hợp lệ!').required('Số điện thoại là bắt buộc!'),
    address: yup.string().required('Địa chỉ giao hàng là bắt buộc!'),
});


export const schemaValidateNotification = yup.object().shape({
    name_shop: yup.string().required('Tên cửa hàng là bắt buộc'),
    email_shop: yup.string().email('Email không hợp lệ!').required('Email là bắt buộc!'),
    phone_shop: yup.string().min(10, 'Số điện thoại không hợp lệ!').max(10, 'Số điện thoại không hợp lệ!').required('Vui lòng nhập số điện thoại!'),
    address_shop: yup.string().required('Địa chỉ lấy hàng không được để trống!'),
    note_shop: yup.string(),
})


export const schemaValidateAddress = yup.object().shape({
    user_name: yup.string().required('Tên người nhận không được để trống!'),
    phone: yup.string().min(10, 'Số điện thoại không hợp lệ!').max(10, 'Số điện thoại không hợp lệ!').required('Vui lòng nhập số điện thoại!'),
    address: yup.string().required('Vui lòng nhập địa chỉ cụ thể!'),
    provinces: yup.string().required('Bắt buộc!'),
    district: yup.string().required('Bắt buộc!'),
    wards: yup.string().required('Bắt buộc!'),
})

export const schemaValidateAttributeCatalog = yup.object().shape({
    attribute: yup.string().required('Trường này là bắt buộc!')
})

export const schemaValidateFormProduct = yup.object().shape({
    short_name: yup.string().required('Vui lòng nhập tên sản phẩm!').min(3, 'Tên sản phẩm phải chứa ít nhất 3 kí tự!').max(255, 'Tên sản phẩm tối đa 255 kí tự!'),
    des_product: yup.string().required('Vui lòng nhập mô tả sản phẩm!').min(6, 'Mô tả sản phẩm phải chứa ít nhất 6 kí tự!').max(5000, 'Mô tả sản phẩm tối đa 5000 kí tự!'),
    category_id: yup.string().required('Vui lòng chọn danh mục sản phẩm!'),
    made_in: yup.string().required('Vui lòng nhập xuất xứ sản phẩm!'),
})