import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Chatroom from "../Chatroom";
import Sidebar from "../Sidebar";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const MyCourseDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [discussion, setDiscussion] = useState([])

  const user = JSON.parse(localStorage.getItem("user"));

  const url = "http://localhost:3001/studentCourses/" + id;

  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, [url]);

  if (data) {
    var unique = [
      ...new Map(data.map((item) => [item["lesson_id"], item])).values(),
    ];
    localStorage.setItem("course", JSON.stringify(unique));
    console.log(unique);
  }

  const discussionUrl = "http://localhost:3001/teacherCourses/discussion/" + id

  useEffect(() => {
      fetch(discussionUrl)
          .then((res => {
              return res.json()
          }))
          .then((data => {
              setDiscussion(data)
          }))
  },[discussionUrl])

  if (discussion) {
    localStorage.setItem('discussion', JSON.stringify(discussion))
    var uniqueDisc = [...new Map(discussion.map(item => [item['discussion_id'], item])).values()];
    console.log(uniqueDisc)
}


  return (
    <div>
      <Sidebar />
      {data[0] && (
        <div className="homeContent">
          <div className="course-details">
            <h1>
              {data[0].course_name} {data[0].year}
            </h1>
            <h5>
              Conducted by: {data[0].fname} {data[0].lname}
            </h5>
            <p>{data[0].description}</p>
          </div>
          <hr />
          <div className="course-content">
            <div className="content-add">
              <h4>Course Content</h4>
              <Link to="/studentHome/StudentAddAssigment">
                <button className="course-btn">
                  <AddCircleOutlineIcon /> Add Content
                </button>
              </Link>
            </div>

            {unique.map((lesson, i) => (
              <div className="lesson">
                <h5 key={i}>{lesson.topic}</h5>
                {data
                  .filter((content) => content.lesson_id === lesson.lesson_id)
                  .map((filtered) => (
                    <a href={filtered.content} target="_blank" rel="noreferrer">
                      <ul>
                        {filtered.content && (
                          <li key={filtered.course_id}>
                            {filtered.content_name}
                          </li>
                        )}
                      </ul>
                    </a>
                  ))}
              </div>
            ))}
          </div>

          <hr />
          <div className="course-quiz">
            <h4>Quizzes</h4>
          </div>

          <hr />
          <div className="course-discn">
              <div className="content-add">
                  <h4>Discussions</h4>
                  <Link to="/teacher/addDiscussion">
                      <button className="course-btn">
                          <AddCircleOutlineIcon /> Add Discussion
                      </button>
                  </Link>
              </div>

              <div className="quiz">
                  {uniqueDisc.map((value, key) => (
                      <div className="discn-name" key={key}>
                          <Link to={`/teacher/courses/discussion/${value.discussion_id}`}>
                              <ul>
                                  <li key={value.discussion_id}>{value.topic}</li>
                              </ul>
                          </Link>
                          <span>
                              <sub>by </sub>
                              <b>{value.post_fname} {value.post_lname}</b>
                              <sub> on </sub>
                              <i>{value.post_datetime.slice(0, 16).replace(' ', ', ')}</i>
                          </span>
                          <EditIcon style={{ color: "green" }} /><DeleteIcon style={{ color: "red" }} />
                      </div>
                  ))}

              </div>
          </div>

          <hr />

          <Chatroom />
        </div>
      )}
    </div>
  );
};

export default MyCourseDetails;
