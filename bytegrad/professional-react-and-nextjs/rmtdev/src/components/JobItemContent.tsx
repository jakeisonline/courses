import { TJobContent } from "../lib/types"
import BookmarkIcon from "./BookmarkIcon"
import Spinner from "./Spinner"

type JobItemContentProps = {
  currentJobItem: TJobContent | null
  isLoading: boolean
}

export default function JobItemContent({
  currentJobItem,
  isLoading,
}: JobItemContentProps) {
  if (isLoading) {
    return <LoadingJobContent />
  }

  if (!currentJobItem) {
    return <EmptyJobContent />
  }

  if (!isLoading && currentJobItem) {
    return (
      <section className="job-details">
        <div>
          <img
            src="https://images.unsplash.com/photo-1610374792793-f016b77ca51a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1272&q=100"
            alt="#"
          />

          <a
            className="apply-btn"
            href="https://fictional9thtechwebsite.com/"
            target="_blank"
          >
            Apply
          </a>

          <section className="job-info">
            <div className="job-info__left">
              <div className="job-info__badge">
                {currentJobItem.badgeLetters}
              </div>
              <div className="job-info__below-badge">
                <time className="job-info__time">
                  {currentJobItem.daysAgo}d
                </time>

                <BookmarkIcon id={currentJobItem.id} />
              </div>
            </div>

            <div className="job-info__right">
              <h2 className="second-heading">{currentJobItem.title}</h2>
              <p className="job-info__company">{currentJobItem.company}</p>
              <p className="job-info__description">
                {currentJobItem.description}
              </p>
              <div className="job-info__extras">
                <p className="job-info__extra">
                  <i className="fa-solid fa-clock job-info__extra-icon"></i>
                  {currentJobItem.duration}
                </p>
                <p className="job-info__extra">
                  <i className="fa-solid fa-money-bill job-info__extra-icon"></i>
                  {currentJobItem.salary}
                </p>
                <p className="job-info__extra">
                  <i className="fa-solid fa-location-dot job-info__extra-icon"></i>{" "}
                  {currentJobItem.location}
                </p>
              </div>
            </div>
          </section>

          <div className="job-details__other">
            <section className="qualifications">
              <div className="qualifications__left">
                <h4 className="fourth-heading">Qualifications</h4>
                <p className="qualifications__sub-text">
                  Other qualifications may apply
                </p>
              </div>
              <ul className="qualifications__list">
                {currentJobItem.qualifications.map((qualification, index) => (
                  <li key={index} className="qualifications__item">
                    {qualification}
                  </li>
                ))}
              </ul>
            </section>

            <section className="reviews">
              <div className="reviews__left">
                <h4 className="fourth-heading">Company reviews</h4>
                <p className="reviews__sub-text">
                  Recent things people are saying
                </p>
              </div>
              <ul className="reviews__list">
                {currentJobItem.reviews.map((review, index) => (
                  <li key={index} className="reviews__item">
                    {review}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <footer className="job-details__footer">
            <p className="job-details__footer-text">
              If possible, please reference that you found the job on{" "}
              <span className="u-bold">rmtDev</span>, we would really appreciate
              it!
            </p>
          </footer>
        </div>
      </section>
    )
  }
}

function LoadingJobContent() {
  return (
    <section className="job-details">
      <div>
        <Spinner />
      </div>
    </section>
  )
}

function EmptyJobContent() {
  return (
    <section className="job-details">
      <div>
        <div className="job-details__start-view">
          <p>What are you looking for?</p>
          <p>
            Start by searching for any technology your ideal job is working with
          </p>
        </div>
      </div>
    </section>
  )
}
