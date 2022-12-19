from sqlalchemy.orm import sessionmaker
from flask import Blueprint, jsonify, request, session, abort
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import cloudinary.uploader
import logging

from app import db
from models import Employer, Applicant, Job, JobApplication

auth_router = Blueprint(__name__, 'auth')

def login_required(fn):
    @wraps(fn)
    def check_login(*args, **kwargs):
        if not session.get('current_user', None):
            abort(403, 'Login required')
        return fn(*args, **kwargs)
    return check_login

@auth_router.route('/api/register/', methods=['POST'])
def register():
    username = request.form.get('username')
    password = request.form.get('password')
    account_type = request.form.get('account_type')
    print(request.files)
    
    password_hash = generate_password_hash(str(password))

    image = request.files['image_url']
    uploaded_image = cloudinary.uploader.upload(image, folder='jobs')
    image_url = uploaded_image['url'] 
    print(image_url)

    if account_type == 'applicant':
        applicant = Applicant(username=username, password_hash=password_hash, image_url=image_url)
        db.session.add(applicant)
        db.session.commit()

        applicant_dict = applicant.to_dict()
        session['current_user'] = applicant_dict
        return jsonify({
        'success': 'success',
        'message': 'Successfully registered',
        'user': applicant_dict
    })

    else:
        employer = Employer(username=username, password_hash=password_hash, image_url=image_url)
        db.session.add(employer)
        db.session.commit()

        employer_dict = employer.to_dict()
        session['current_user'] = employer_dict
        return jsonify({
        'success': 'success',
        'message': 'Successfully registered',
        'user': employer_dict
    })

@auth_router.route('/api/login/', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    account_type = request.json.get('account_type')


    if account_type == 'applicant':
        applicant = Applicant.query.filter_by(username=username).first()
        if not applicant:
            abort(404, 'User not found')
        if not check_password_hash(applicant.password_hash, password):
            abort(403, 'Username and password don\'t match')
        applicant_dict = applicant.to_dict()
        session['current_user'] = applicant_dict
        return jsonify({
        'success': 'success',
        'message': 'Successfully logged in',
        'user': applicant_dict
        })
    else:
        employer = Employer.query.filter_by(username=username).first()
        if not employer:
            abort(404, 'Member of staff not found')
        if not check_password_hash(employer.password_hash, password):
            abort(403, 'Username and password don\'t match')
        employer_dict = employer.to_dict()
        session['current_user'] = employer_dict
        return jsonify({
        'success': 'success',
        'message': 'Successfully logged in',
        'user': employer_dict    
        })

@auth_router.route('/api/logout/', methods=['POST'])
def logout():
    session.pop('current_user', None)
    return jsonify({
        'status': 'Success',
        'message': 'Successfully logged out'
    })

@auth_router.route('/api/verify/', methods=['GET'])
def verify():
    current_user = session.get('current_user', None)
    if not current_user:
        abort(404, 'User not logged in or not found')
    return jsonify({
        'status': 'success',
        'message': 'User verified',
        'user': current_user
    })

# USER DASHBOARD (SHOW)
@auth_router.route('/api/user-dashboard/', methods=['GET'])
def get_jobs():
    current_user = session.get('current_user', None)
    print(current_user['username'])

    jobApplications = JobApplication.query.filter_by(applicant_id = current_user['id']).all()
    job_applications_dict = [application.to_dict() for application in jobApplications]

    jobs = Job.query.all()
    employers = Employer.query.all()

    employers_dict = []
    for employer in employers:
        if len(employer.jobs) >= 1:
             employers_dict.append(employer.to_dict())

    jobs_todict = [job.to_dict() for job in jobs]

    return jsonify({
        'jobs': jobs_todict,
        'employers': employers_dict,
        'job_applications': job_applications_dict    
    })

# EMPLOYER CREATE JOB
@auth_router.route('/api/createJob/', methods=['POST'])
def create_job():
    current_user = session.get('current_user')
    jobTitle = request.form.get('title')
    jobDescription = request.form.get('description')

    job = Job(title=jobTitle, description=jobDescription, employer_id=current_user['id'])
    db.session.add(job)
    db.session.commit()
    return jsonify(job.to_dict())
    # post to db
    # return todict to frontend and log to confirm

# SHOW JOB
@auth_router.route('/api/job/<job_id>', methods=['GET'])
def show_job(job_id):
    job = Job.query.get_or_404(job_id, 'Job not found')
    job_dict = job.to_dict()
    return jsonify(job_dict)

# EMPLOYER SHOW ALL JOBS
@auth_router.route('/api/employer-jobs/', methods=['GET'])
def get_employer_jobs():
    current_user = session.get('current_user')

    jobs = Job.query.filter_by(employer_id = current_user['id']).all()
    jobs_todict = []

    for job in jobs:
        job_dict = job.to_dict()
        job_dict['application_count'] = len(job.applications)
        jobs_todict.append(job_dict)

    return jsonify(jobs_todict)

# APPLY FOR JOB
@auth_router.route('/api/jobApply/<job_id>', methods=['POST'])
def application(job_id):
    current_user = session.get('current_user')

    application = JobApplication(job_id=job_id, applicant_id=current_user['id'], stage='pending', status='active')
    db.session.add(application)
    db.session.commit()
    return jsonify(application.to_dict())

# EDIT JOBS


# DELETE JOBS