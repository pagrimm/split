export function createParticipationButton (roommateName) {
  return `<label class="btn btn-primary active">
    <input type="checkbox" name="participation" autocomplete="off" value="${roommateName}" checked> ${roommateName}
  </label>`;
}