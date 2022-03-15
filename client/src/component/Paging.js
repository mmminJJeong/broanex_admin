import React from "react";

const Paging = (props) => {
  const totalPages = props.totalPage - 1;
  const num = [];
  if (props.total < 10) {
    for (let i = 0; i < props.total / 10; i++) {
      num.push(i);
    }
  } else if (props.total > 10) {
    let showPage = parseInt(props.page / 10);

    for (let i = 0 + showPage * 10; i < 10 + 10 * showPage; i++) {
      if(!(i>totalPages)){
        num.push(i);
      }
    }
  }

  const Prev = () => {
    if(!(props.page === 0)){
      props.setPage(props.page - 1);
    }
  };
  const Next = () => {
    if(!(props.page === totalPages)){
    props.setPage(props.page + 1);
    }
  };
  const First = () => {
    if(!(props.page === 0)){
      props.setPage(0);
    }
  };
  const End = () => {
    if(!(props.page === totalPages)){
    props.setPage(totalPages);
    }
  };

  return (
    <>
      <button onClick={First} className="btn-2 btn-color-2 btn-f"></button>
      <button onClick={Prev} className="btn-2 btn-color-2 btn-p"></button>
      {num.map((n) => (
        <button
          key={n}
          onClick={() => props.setPage(n)}
          className={
            props.page === n ? "btn-2 btn-color-2-active" : "btn-2 btn-color-2"
          }
        >
          {n + 1}
        </button>
      ))}
      <button onClick={Next} className="btn-2 btn-color-2 btn-n"></button>
      <button onClick={End} className="btn-2 btn-color-2 btn-e"></button>
    </>
  );
};

export default Paging;
