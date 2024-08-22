import EmojiPicker from "emoji-picker-react";

export const EmojiPickerCustom = ({ show, onEmojiClick }) => {
  return (
    <EmojiPicker
      open={show}
      onEmojiClick={({ emoji }) => {
        onEmojiClick(emoji);
      }}
      theme="dark"
      searchPlaceHolder="Pesquisar..."
      emojiStyle={"native"}
      previewConfig={{
        showPreview: false,
      }}
      categories={[
        {
          category: "suggested",
          name: "Sugerido",
        },
        {
          category: "custom",
          name: "Customizado",
        },
        {
          category: "smileys_people",
          name: "Pessoas",
        },
        {
          category: "animals_nature",
          name: "Animais",
        },
        {
          category: "food_drink",
          name: "Comida",
        },
        {
          category: "travel_places",
          name: "Viagem",
        },
        {
          category: "activities",
          name: "Atividades",
        },
        {
          category: "objects",
          name: "Objetos",
        },
        {
          category: "symbols",
          name: "Símbolos",
        },
        {
          category: "flags",
          name: "Bandeiras",
        },
      ]}
    />
  );
};
