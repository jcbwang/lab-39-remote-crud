import superagent from "superagent";

export const get = payload => dispatch => {
  return superagent.get(payload.url).then(data => {
    dispatch(fetch("GET", { model: payload.model, data: data.body.results }));
  });
};

export const post = payload => dispatch => {
  return superagent
    .post(payload.url)
    .send(payload.record)
    .then(data => {
      dispatch(fetch("POST", { model: payload.model, data: data.body }));
    })
    .catch(console.error);
};

export const destroy = payload => dispatch => {
  return superagent
    .delete(payload.url)
    .then(data => {
      dispatch(fetch("DELETE", { model: payload.model, id: payload.id }));
    })
    .catch(console.error);
};

export const patch = payload => {
  return {
    type: "PATCH",
    payload: payload
  };
};

export const put = payload => dispatch => {
  return superagent
    .put(payload.url)
    .send(payload.record)
    .then(data => {
      dispatch(
        fetch("PUT", {
          model: payload.model,
          id: payload.id,
          data: payload.data
        })
      );
    });
};

const fetch = (method, payload) => {
  return {
    type: method,
    payload: payload
  };
};
