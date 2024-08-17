export function getBase64(file: any, cb: any) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result)
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

export function getEmployeeAvatar(fileName: string) {
  if (typeof process === 'undefined') {
    return '';
  }

  // return process.env?.REACT_APP_PUBLIC_API_URL + '/storage/employees/avatars/' + fileName;
  return 'http://admin-api.test/public/storage/employees/avatars/' + fileName;
}
