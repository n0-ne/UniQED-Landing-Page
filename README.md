# UniQED [유니큐드] 수리논술 AI 첨삭 랜딩페이지

수리논술 독학생을 대상으로 문제·해법 수요를 검증하는 fake-door 랜딩페이지입니다. 기본 페이지는 특정 대학에 종속되지 않으며, 대학별 설정을 추가해 같은 구조의 전용 페이지를 만들 수 있습니다. 결제 정보는 받지 않고 준비 중임을 고지한 뒤 출시 알림 연락처만 수집합니다.

## 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 열면 대학 비종속형 기본 랜딩페이지가 표시됩니다.

## 환경변수

`.env.example`을 참고해 `.env.local`을 만듭니다.

- `SUPABASE_URL`: Supabase 프로젝트 URL
- `SUPABASE_SERVICE_ROLE_KEY`: 서버 전용 service-role 키. 절대 `NEXT_PUBLIC_` 접두사를 붙이지 않습니다.
- `CONTACT_HASH_SALT`: 연락처 중복 확인용 해시에 사용할 충분히 긴 임의 문자열

환경변수가 없는 로컬 개발 환경에서는 이벤트와 신청이 `.data/*.jsonl`에 저장됩니다. 프로덕션에서 Supabase 설정이 없으면 API는 데이터 유실을 막기 위해 `503`을 반환합니다.

## Supabase

`supabase/migrations/202611110001_create_landing_tables.sql`을 Supabase SQL Editor 또는 CLI로 적용합니다. 두 테이블 모두 RLS를 활성화하고 브라우저 역할의 권한을 제거합니다. 모든 쓰기는 Next.js Route Handler를 통해 수행합니다.

## 주요 경로

- `/`: 대학 비종속형 기본 랜딩페이지
- `/university/cau`: 중앙대 전용 랜딩페이지 예시
- `/cau`: 기존 링크 호환용 경로 (`/university/cau`로 이동)
- `/privacy`: 개인정보 수집·이용 안내 초안
- `/api/events`: 퍼널 이벤트 기록
- `/api/leads`: 출시 알림 연락처 기록

## 현재 실험 설정

- 리포트: `grounded` 단일 버전
- 가격: `59,000원` 단일 가격
- 상품: 시즌 패스, 답안 최대 30장
- 핵심 대상: 정기 학원·과외 없이 준비하거나 특강·파이널만 이용하는 학생

## 대학별 페이지 추가

`lib/landing-config.ts`의 `universityLandingConfigs`에 학교 slug와 문구를 추가하면 `/university/[slug]` 경로가 생성됩니다. 화면, 퍼널, 이벤트 기록, 가격 실험 값은 공통 컴포넌트를 사용하므로 학교별 페이지를 복사해서 관리할 필요가 없습니다.

## 배포

Git 저장소를 Vercel에 연결하면 Root Directory는 저장소 루트인 `./`(기본값)로 둡니다. Framework Preset은 Next.js 자동 감지를 사용하고, Preview와 Production 모두 환경변수를 별도로 설정한 뒤 배포합니다.

광고 집행 전에는 다음 항목을 실제 정보로 교체해야 합니다.

- 문의 이메일
- 실제 기출 답안과 채점 결과
- 대학 공개 자료 원문 링크
- 개인정보 처리 담당자와 최종 안내 문구
- 가격 및 제공 답안 수
