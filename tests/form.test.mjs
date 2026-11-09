import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateLead } from '../assets/js/validate.js';

const good = { name: '김원장', phone: '010-4236-6319', clinic: 'A한의원', region: '', agree: true };

test('valid lead passes', () => assert.equal(validateLead(good), null));
test('empty name rejected', () => assert.equal(validateLead({ ...good, name: '  ' }), '이름을 입력해 주세요'));
test('empty clinic rejected', () => assert.equal(validateLead({ ...good, clinic: '' }), '한의원·한방병원명을 입력해 주세요'));
test('short phone rejected', () => assert.equal(validateLead({ ...good, phone: '0101234' }), '연락처를 확인해 주세요'));
test('phone formats accepted', () => {
  for (const phone of ['010-4236-6319', '01042366319', '02-761-1633', '031 123 4567']) assert.equal(validateLead({ ...good, phone }), null, phone);
});
test('missing consent rejected', () => assert.equal(validateLead({ ...good, agree: false }), '개인정보 수집에 동의해 주세요'));
test('region required when asked', () => assert.equal(validateLead({ ...good, region: '' }, { requireRegion: true }), '지역을 입력해 주세요'));
