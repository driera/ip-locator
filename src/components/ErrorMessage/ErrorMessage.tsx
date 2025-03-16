import { FunctionComponent } from "react";
import { APIError } from "../../services/types";
import styles from "./ErrorMessage.module.css";

export const ErrorMessage: FunctionComponent<{
  error: APIError | undefined;
}> = ({ error }) => {
  return error ? (
    <div className={styles.errorMessage} role="alert">
      <span className={styles.errorMessageIcon} aria-hidden>
        ⚠️
      </span>
      {error.message}
    </div>
  ) : null;
};
