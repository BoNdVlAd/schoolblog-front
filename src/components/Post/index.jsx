import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { fetchRemovePost } from '../../redux/slices/posts';
import { fetchRemoveSchoolPost, fetchSchoolPosts } from '../../redux/slices/schoolposts';
import { fetchRemovePost4 } from '../../redux/slices/posts4';
import { fetchRemovePost3 } from '../../redux/slices/posts3';
import { fetchRemovePost2 } from '../../redux/slices/posts2';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { fetchRemovePost1 } from '../../redux/slices/posts1';

export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  imageUrlAll,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  console.log('categoryId' + categoryId);
  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm('Are you sure you want to delete the article')) {
      if (categoryId === 0) {
        dispatch(fetchRemovePost(id));
      } else if (categoryId === 1) {
        dispatch(fetchRemoveSchoolPost(id));
      } else if (categoryId === 2) {
        dispatch(fetchRemovePost1(id));
      } else if (categoryId === 3) {
        dispatch(fetchRemovePost2(id));
      } else if (categoryId === 4) {
        dispatch(fetchRemovePost3(id));
      } else if (categoryId === 5) {
        dispatch(fetchRemovePost4(id));
      }
    }
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  console.log('----------------------imageUrlAll--------------------');
  console.log(imageUrlAll);

  const images = [
    {
      label: 'San Francisco – Oakland Bay Bridge, United States',
      imgPath:
        'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    },
  ];

  return (
    // <Link className={styles.link} to={`/posts/${id}`}>
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            {/* <Link to={`${categoryId === 0 ? `/posts/${id}` : `/schoolposts/${id}`}`}> */}
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      <div className={styles.slider}>
        <Carousel responsive={responsive}>
          {imageUrlAll.map((e, index) => (
            <div className={clsx(styles.wrap, { [styles.wrapFull]: isFullPost })}>
              <img
                className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
                src={`${process.env.REACT_APP_API_URL}${imageUrlAll[index]}`}
                alt={title}
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* {imageUrlAll && (
          <div className={clsx(styles.wrap, { [styles.wrapFull]: isFullPost })}>
            {imageUrlAll.map((e, index) => (
              <img
                className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
                src={`http://localhost:4444${imageUrlAll[index]}`}
                alt={title}
              />
            ))}
          </div>
        )} */}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? (
              title
            ) : (
              // <Link to={`${categoryId === 0 ? `/posts/${id}` : `/schoolposts/${id}`}`}>
              <Link to={`/posts/${id}`}>{title}</Link>
            )}
          </h2>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li key="uniqueId1">
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    // </Link>
  );
};
