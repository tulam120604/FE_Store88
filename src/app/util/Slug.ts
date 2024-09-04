import slugify from 'slugify';

export function convert_Slug(str: string) {
    if (!str) return;
    const str_slug = slugify(str, {
        lower: true,
        locale: 'vi'
    })
    return str_slug
}