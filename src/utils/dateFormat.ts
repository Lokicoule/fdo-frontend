import i18n from "i18next";

const date = new Intl.DateTimeFormat(i18n.language, {
  timeStyle: "medium",
  dateStyle: "short",
});

export default function dateFormat(dateString?: string | null) {
  if (!dateString) {
    return "";
  }
  return date.format(new Date(dateString));
}
