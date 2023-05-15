import api, { getImageUrl } from '..';

export default function (page, { personId }) {
  // api.get(`/person/${personId}`);
  return api.get('/person/' + personId).then((data) => {
    page.tag('Backdrop').src = getImageUrl(data.profile_path, 'original');
    page.entityInfo = { ...data, entityType: 'person' };
  });
}
