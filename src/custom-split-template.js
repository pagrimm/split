export function createSplitInput(roommateName) {
  return`<div class="input-group mb-1">
    <div class="input-group-prepend">
      <span class="input-group-text">${roommateName} Split</span>
    </div>
    <input type="number" step="0.01" class="form-control custom-split-input" id='custom-debit-${roommateName}'>
  </div>`;
}