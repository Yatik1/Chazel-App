export const getSender = (loggedUser:any, users:any) => {
    return users[0]?._id === loggedUser?._id ? users[1] : users[0];
  };

export const getSenderFull = (loggedUser:any, users:any) => {
   return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isSameSenderMargin = ({messages, m, i, userId}:any) => {
  
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameSender = ({messages, m, i, userId}:any) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = ({messages, i, userId}:any) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = ({messages, m, i}:any) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
