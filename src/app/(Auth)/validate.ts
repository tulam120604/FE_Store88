import * as yup from 'yup';

export const schemaValidateRegister = yup.object().shape({
    user_name: yup.string().min(3, 'Tên ít nhất 3 kí tự!').max(30, 'Tên tối đa 30 kí tự!').required('Tên là bắt buộc!').optional(),
    email: yup.string().email('Email không hợp lệ!').required('Email là bắt buộc!'),
    password: yup.string().min(6, 'Mật khẩu ít nhất 6 kí tự!').required('Mật khẩu là bắt buộc!'),
});

export const schemaValidateOrder = yup.object().shape({
    name_user: yup.string().required('Đại vương phải nhập tên!'),
    email_user: yup.string().email('Email đại vương không hợp lệ!').required('Đại vương hãy nhập email!'),
    phone: yup.string().min(10, 'Số điện thoại đại vương phải 10 số!').max(10, 'Số điện thoại đại vương phải 10 số!').required('Đại vương hãy nhập số điện thoại!'),
    address: yup.string().required('Đại vương hãy nhập địa chỉ để giao hàng!'),
});


export const schemaValidateNotification = yup.object().shape({
    name_shop: yup.string().required('Đại vương phải nhập tên shop!'),
    email_shop: yup.string().email('Email đại vương không hợp lệ!').required('Đại vương hãy nhập email!'),
    phone_shop: yup.string().min(10, 'Số điện thoại đại vương phải 10 số!').max(10, 'Số điện thoại đại vương phải 10 số!').required('Đại vương hãy nhập số điện thoại!'),
    address_shop: yup.string().required('Đại vương hãy nhập địa chỉ lấy hàng!'),
    note_shop: yup.string(),
})


export const schemaValidateAddress = yup.object().shape({
    user_name: yup.string().required('Đại vương vui lòng nhập tên!'),
    phone: yup.string().min(10, 'Số điện thoại đại vương phải 10 số!').max(10, 'Số điện thoại đại vương chỉ được 10 số!').required('Đại vương vui lòng nhập tên!'),
    address: yup.string().required('Đại vương vui lòng nhập địa chỉ cụ thể!'),
    provinces: yup.string().required('Bắt buộc!'),
    district: yup.string().required('Bắt buộc!'),
    wards: yup.string().required('Bắt buộc!'),
})

export const schemaValidateAttributeCatalog =  yup.object().shape({
    attribute: yup.string().required('Trường này là bắt buộc!')
})