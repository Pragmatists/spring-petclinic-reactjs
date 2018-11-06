import { url } from '../../util';

const toSelectOptions = (pettypes) => pettypes.map(pettype => ({ value: pettype.id, name: pettype.name }));

export default (ownerId, petLoaderPromise) => {
  return Promise.all(
    [fetch(url('api/pettypes'))
      .then(response => response.json())
      .then(toSelectOptions),
    fetch(url('api/owners/' + ownerId))
      .then(response => response.json()),
      petLoaderPromise,
    ]
  ).then(results => ({
    pettypes: results[0],
    owner: results[1],
    pet: results[2]
  }));
};
