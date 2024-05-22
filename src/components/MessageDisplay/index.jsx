import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { TransitionGroup } from "react-transition-group";

import styles from "./styles.module.scss";

import { CardNote } from "@/components/CardMedia";
import { TYPE_MEDIA } from "@/global/constants";

// import { TYPE_MEDIA } from "@/global/constants";

export const MessageDisplay = ({
  notes,
  notifyDelete,
  classNameWrap = "",
  containerRef = null,
}) => {
  const classNameContainer = [classNameWrap, styles.container].join(" ");

  const styleListItem = {
    display: "flex",
    justifyContent: "flex-end",
  };

  const combinedAndSortedItems = [...notes].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );

  return (
    <div className={classNameContainer} ref={containerRef}>
      <List>
        <TransitionGroup>
          {combinedAndSortedItems.map((item) => (
            <Collapse key={item.id}>
              <ListItem style={styleListItem}>
                <CardNote
                  id={item.id}
                  text={item.text}
                  notifyDelete={notifyDelete}
                  typeMedia={TYPE_MEDIA.NOTE}
                />
              </ListItem>
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </div>
  );
};
