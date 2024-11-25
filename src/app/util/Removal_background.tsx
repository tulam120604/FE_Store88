'use client'

import React, { useEffect, useState } from 'react';
import { removeBackground } from '@imgly/background-removal';
import Image from 'next/image';


export default function Removal_background({ link_img }: { link_img: string | undefined | null }) {
    const [src_img, setSrc_img] = useState<string | null>(null);
    const [url_img, seturl_img] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            if (!link_img) return;
            setLoading(true);
            try {
                const result = await removeBackground(link_img);
                seturl_img(result);
            } catch (error) {
                setSrc_img(link_img);
            } finally {
                setLoading(false);
            }
        })()
    }, [link_img])
    return (
        loading ?
            <Image width={150} height={150} src={url_img} alt='Loading...' />
            :
            <Image width={150} height={150} src={url_img ? url_img : src_img} className='' alt='Loading...' />
    )
}
