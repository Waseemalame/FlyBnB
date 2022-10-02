import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createReview, getListingsReviews, removeReviewThunk } from '../../store/reviews'
import "./Reviews.css"
const Reviews = () => {
  const [showErrors, setShowErrors] = useState(false)
  const [reviewValidationErrors, setReviewValidationErrors] = useState([])
  const [reviewsEmpty, setReviewsEmpty] = useState(false)
  const [reviewContent, setReviewContent] = useState('')
  const { id } = useParams();
  const listing = useSelector(state => state.listings[id])
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()

  const reviews = useSelector((state) => {
    if (!listing.reviews) return null;

    return listing.reviews.map(reviewId => state.reviews[reviewId]);
  });

  useEffect(() => {
    dispatch(getListingsReviews(listing.id))
  }, [dispatch, listing.id])

  console.log(reviews)
  console.log(reviews)
  console.log(reviews)
  console.log(reviews)

  const filteredReviews = reviews?.filter(review => review !== undefined)


  const errors = []

  useEffect(() => {
    if(!reviewContent) errors.push('review body cannot be left blank')
    setReviewValidationErrors(errors)
  }, [reviewContent]);



  const removeReviewFunc = async (reviewId, listingId) => {
    await dispatch(removeReviewThunk(reviewId, listingId))
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if(reviewValidationErrors.length > 0){
      setShowErrors(true)
      return;
    }
    const data = {
      content: reviewContent,
      listingId: listing.id,
      userId: sessionUser.id
    }
    dispatch(createReview(data));
    setReviewContent('');
    setShowErrors(false);
    setReviewValidationErrors([]);
  }

  return (
    <div className="reviews-container">
              {showErrors && (
              <ul className="review-listing-errors">
                 {reviewValidationErrors.map((error, idx) => (
                   <li key={idx}>{error}</li>
                 ))}
              </ul>
              )}
              <form className='review-form' onSubmit={handleReviewSubmit}>
                <input
                className='review-input'
                 type="text"
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                placeholder="enter your review"
                 />
                 <button className='submit-review-btn' type='submit'>Submit Review</button>
              </form>
              {filteredReviews?.length === 0 ? (
                <h2 className='reviews-header'>Be the first to post a review!</h2>
              ): <h2 className='reviews-header'>User reviews below</h2> }

          <div className="reviews-display">
            {reviews ? reviews.map(review => (
              <>
                {review && (
                  <div className='review-content'>
                    <div className="user-review-img"
                    style={{ backgroundImage: `url(${review.User.profileImg})` }}
                    >
                    <img className='user-review-img' src={review?.User ? review?.User?.profileImg : ''} alt="" />
                    </div>
                    <div className='review-username'>{review?.User?.username}:</div>
                    <div className='review-content'>{review?.content}</div>
                    {review?.userId === sessionUser.id && (
                        <button
                        className='delete-review-btn'
                         onClick={() => {
                          removeReviewFunc(review.id, listing.id)
                        }}>
                          <img src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png" alt=''/>
                        </button>
                    )}
                  </div>
                )}
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum eveniet voluptatum, aperiam voluptas similique nemo unde dignissimos quo corporis itaque sunt id, incidunt eligendi dolores excepturi maxime laboriosam delectus qui.
                Eum, laborum molestias asperiores laudantium hic libero facilis dolor, nostrum ipsam voluptate, minus aliquam quis? Explicabo dolorum magni deserunt eius nesciunt accusamus vero, natus, praesentium, consectetur itaque aspernatur corrupti assumenda!
                Tempore cumque debitis sint voluptate atque dignissimos reprehenderit non voluptatibus dicta quod veniam quaerat mollitia, error nostrum eaque voluptates reiciendis veritatis esse culpa sunt architecto. Quo totam optio reiciendis porro.
                Fuga, id illo saepe ipsa blanditiis sunt nesciunt quod, quibusdam non, officia consequuntur ea! Reiciendis, velit repudiandae. Doloribus, exercitationem enim laborum excepturi voluptatem veritatis aut, ex itaque voluptate recusandae delectus?
                Dolorem tempora, odit eligendi numquam consequatur illo ad aliquid ab, accusamus blanditiis aspernatur molestiae aliquam assumenda, eveniet autem perspiciatis nam dolore ea voluptates repellendus vitae obcaecati libero? Est, voluptatum perferendis?
                Tenetur omnis, veniam labore illo deleniti quod reprehenderit excepturi accusantium quidem voluptatum, numquam voluptas dolorum perspiciatis incidunt eaque asperiores quam perferendis! Corporis earum sapiente possimus quam quisquam! Laborum, odit esse?
                Accusantium, asperiores, reprehenderit officia provident labore amet voluptas laborum error, eaque assumenda deserunt dignissimos tempora perspiciatis blanditiis porro quo laudantium. Necessitatibus nisi maiores dolor atque minima quia pariatur perspiciatis velit.
                Debitis ducimus, praesentium assumenda necessitatibus consequatur esse autem iusto blanditiis ratione voluptatum labore ex. Quaerat odit nisi fuga ratione commodi nostrum numquam optio, libero earum nihil ipsa inventore non expedita?
                A totam vel quod error veniam. Magnam, non magni accusamus dolores placeat porro temporibus aliquam, tenetur eveniet odio fuga animi atque minus! Sapiente harum beatae id esse nesciunt doloribus expedita?
                Deserunt provident eligendi, officiis ipsam veniam, sapiente voluptates ullam excepturi, a quod libero. Ut facilis officiis ad quam. Doloremque sit quos molestias blanditiis aut beatae numquam adipisci ullam praesentium exercitationem!
                Incidunt, totam? Reiciendis distinctio fugit nostrum vero neque mollitia non exercitationem earum nemo a repellendus ad maxime harum, officia quasi possimus ipsam aliquam, suscipit vel. Culpa aspernatur tempora facere error.
                Sint recusandae expedita autem maxime facilis quos, rerum consequatur nam? Quaerat facilis delectus quae explicabo, ipsam excepturi, ducimus magnam accusantium nam porro aliquid sint vitae unde ratione suscipit doloremque omnis?
                Fugit labore error vero dolores perferendis quis ipsam nobis consequatur quod, minus rem beatae repudiandae deserunt quam ab. Eveniet in odit quidem quae esse aut hic sequi placeat! Quaerat, praesentium!
                Exercitationem quibusdam doloribus possimus iusto ipsam similique, in culpa tempore, adipisci itaque aspernatur, impedit nesciunt optio nam minus unde minima quidem consectetur excepturi vitae ea voluptatibus. Soluta maiores nihil aperiam.
                Quae cupiditate itaque ipsum pariatur voluptas dolor repellendus sit placeat! Quibusdam nesciunt eligendi vitae odio tenetur voluptatem debitis, facere placeat, delectus, repellat fugiat! Quasi repellendus possimus laudantium in harum saepe.
                Minus officiis in at nulla tempore laudantium cumque. Vitae totam nihil iure aut nam facere, doloremque dolore deserunt beatae officia reiciendis a iusto animi laborum amet reprehenderit nostrum accusamus consequuntur!
                Alias nulla nobis porro debitis praesentium totam delectus. Alias animi veritatis asperiores a rem dicta repellat nulla ipsam reiciendis cumque quam optio, dolorum voluptatum nostrum, labore ad quibusdam ab ipsum!
                Fugiat enim harum eligendi quo quis? Asperiores mollitia voluptates in quibusdam ipsam, at soluta deleniti iste exercitationem vero totam maiores earum rem perspiciatis velit a pariatur laboriosam minima explicabo culpa?
                Sapiente vel, at iusto libero sunt rem dolores adipisci, repellendus expedita repellat rerum voluptate a, illo nemo! Doloribus, consectetur, voluptas ratione voluptates dolores mollitia sequi magni consequatur, modi ullam nobis?
                Facere necessitatibus doloribus non? Sed nesciunt id cum ratione. Nihil vel dicta laudantium deleniti dolore perspiciatis illum cupiditate et sint, nesciunt optio obcaecati corporis placeat, voluptatem quam laboriosam nulla ratione.</p>

              </>
            )) : ''}

          </div>
        </div>
  )
}

export default Reviews
