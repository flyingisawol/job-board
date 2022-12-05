from datetime import date
from app import app, db
from models import Employer, Applicant, Job, JobApplication

# employers = [
#     {
#         'username': 'Cash App',
#     },
#     {
#         'username': 'TDB',
#     },
#     {
#         'username': 'Spiral',
#     },
#     {
#         'username': 'Square',
#     },
#     {
#         'username': 'Tidal',
#     }
# ]

# applicants = [
#     {
#         'username': 'AK'
#     },
#     {
#         'username': 'Dylan'
#     },
#     {
#         'username': 'Jack'
#     },
#     {
#         'username': 'Adora'
#     },
#     {
#         'username': 'Max'
#     },
#     {
#         'username': 'Chris'
#     },
#     {
#         'username': 'Mikey'
#     },
#     {
#         'username': 'Gerald'
#     },
#     {
#         'username': 'Ilija'
#     },
#     {
#         'username': 'Parshwa'
#     }
# ]

# jobs = [
#     {
#         'title': 'Junior Developer',
#         'description': 'press buttons on keyboard'
#     },
#     {
#         'title': 'Junior Developer',
#         'description': 'press buttons on keyboard'
#     },
#     {
#         'title': 'Junior Developer',
#         'description': 'press buttons on keyboard'
#     },
#     {
#         'title': 'Junior Developer',
#         'description': 'press buttons on keyboard'
#     },
#     {
#         'title': 'Junior Developer',
#         'description': 'press buttons on keyboard'
#     }
# ]


# with app.app_context():
#     db.drop_all()
#     db.create_all()
    
#     for i in employers:
#         employer = Employer(username=i['username'], password_hash='')
#         for j in jobs:
#             job = Job(title=j['title'], description=j['description'])
#             employer.jobs.append(job)
#         db.session.add(employer)
    
#     for i in applicants:
#         applicant = Applicant(username=i['username'], password_hash='')
#         db.session.add(applicant)

    # ak = Applicant.query.get(1)
    # jr_dev = Job.query.get(1)
    # ak_job_application = JobApplication(job=jr_dev, applicant=ak, stage='Pending', status='Active')
    # db.session.add(ak_job_application)

    # adora = Applicant.query.get(4)
    # jr_dev = Job.query.get(2)
    # adora_job_application = JobApplication(job=jr_dev, applicant=adora, stage='Pending', status='Active')
    # db.session.add(adora_job_application)

    # adora = Applicant.query.get(4)
    # jr_dev = Job.query.get(1)
    # adora_job_application = JobApplication(job=jr_dev, applicant=adora, stage='Pending', status='Active')
    # db.session.add(adora_job_application)

    # dylan = Applicant.query.get(2)
    # jr_dev = Job.query.get(2)
    # adora_job_application = JobApplication(job=jr_dev, applicant=dylan, stage='Pending', status='Active')
    # db.session.add(adora_job_application)
    
    db.session.commit()