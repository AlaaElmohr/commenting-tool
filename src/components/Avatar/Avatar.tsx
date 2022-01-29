import React from 'react';
/*
 local files
 */
import { AvatarProps } from './types';

const Avatar = ({ url, alt }: AvatarProps) => {
  return <img className="w-8 h-8 rounded-2xl" src={url} alt={alt} />;
};

export default Avatar;
