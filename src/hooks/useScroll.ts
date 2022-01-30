import { useEffect } from 'react';

const useScroll = (onLoadMore: () => void) => {
  const onScrollListener = () => {
    //when user scroll down to the bottom, load more comments
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      onLoadMore();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScrollListener);
    return () => {
      window.removeEventListener('scroll', onScrollListener);
    };
  });
};

export default useScroll;
