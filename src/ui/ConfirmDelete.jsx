// Styles
import styled from "styled-components";

// UI Components
import { Button, Heading } from "./index";

function ConfirmDelete({
  resourceName,
  handleConfirm,
  disabled,
  handleCloseModal,
}) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>

      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={handleConfirm}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

export default ConfirmDelete;
