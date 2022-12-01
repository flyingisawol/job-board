import datetime
from app import db

class Employer(db.Model):
    __tablename__ = 'employers'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)
    jobs = db.relationship('Job', back_populates='employer')
    filename = db.Column(db.String(100))
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'account_type': 'employer'
        }

    def __repr__(self):
        return f'<Employer: {self.id} - {self.username}>'

    def __repr__(self):
        return f"""
            Image:
                id: {self.id},
                public_id: {self.public_id},
                secure_url: {self.secure_url},
                filename: {self.filename}
        """
        
class Applicant(db.Model):
    __tablename__ = 'applicants'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)
    applications = db.relationship('JobApplication', back_populates='applicant')

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'account_type': 'applicant'
        }

    def __repr__(self):
        return f'<Applicant: {self.id} - {self.username}>'

class Job(db.Model):
    __tablename__ = 'jobs'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    employer_id = db.Column(db.Integer, db.ForeignKey('employers.id'))
    employer = db.relationship('Employer', back_populates='jobs')
    applications = db.relationship('JobApplication', back_populates='job')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'employer_id': self.employer_id
        }

    def __repr__(self):
        return f'<Job: {self.id} - {self.title}>'

class JobApplication(db.Model):
    __tablename__ = 'job_applications'
    id = db.Column(db.Integer, primary_key=True)

    applicant_id = db.Column(db.Integer, db.ForeignKey('applicants.id'))
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'))

    applicant = db.relationship('Applicant', back_populates='applications')
    job = db.relationship('Job', back_populates='applications')

    stage = db.Column(db.String(50))
    status = db.Column(db.String(50))

    def to_dict(self):
        return {
            'id': self.id,
            'stage': self.stage,
            'status': self.status
        }