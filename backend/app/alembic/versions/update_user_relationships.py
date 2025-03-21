"""Update User table with relationships, timestamps, and role

Revision ID: update_user_relationships
Revises: new_ai_patient_consultation
Create Date: 2024-08-02 10:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'update_user_relationships'
down_revision = 'new_ai_patient_consultation'
branch_labels = None
depends_on = None


def upgrade():
    # Add credits_balance column to the User table
    op.add_column('user', sa.Column('credits_balance', sa.Integer(), nullable=False, server_default='0'))
    
    # Check if columns already exist
    inspector = sa.inspect(op.get_bind())
    columns = [col['name'] for col in inspector.get_columns('user')]
    
    # Add created_at and updated_at if they don't exist
    if 'created_at' not in columns:
        op.add_column('user', sa.Column('created_at', sa.TIMESTAMP(), nullable=False, 
                                        server_default=sa.text('CURRENT_TIMESTAMP')))
    
    if 'updated_at' not in columns:
        op.add_column('user', sa.Column('updated_at', sa.TIMESTAMP(), nullable=False, 
                                       server_default=sa.text('CURRENT_TIMESTAMP')))
    
    # Add role column with default value 'User'
    if 'role' not in columns:
        op.add_column('user', sa.Column('role', sa.String(50), nullable=False, 
                                       server_default=sa.text("'User'")))
        
        # Update existing superusers to have SuperAdmin role
        op.execute("""
            UPDATE "user" 
            SET role = 'SuperAdmin'
            WHERE is_superuser = TRUE
        """)
    
    # Let's also add first_name and last_name columns
    if 'full_name' in columns and 'first_name' not in columns:
        # Add first_name and last_name columns
        op.add_column('user', sa.Column('first_name', sa.String(100), nullable=True))
        op.add_column('user', sa.Column('last_name', sa.String(100), nullable=True))
        
        # Migrate data from full_name to first_name and last_name
        op.execute("""
            UPDATE "user" 
            SET 
                first_name = SPLIT_PART(full_name, ' ', 1),
                last_name = SUBSTRING(full_name FROM POSITION(' ' IN full_name) + 1)
            WHERE full_name IS NOT NULL AND POSITION(' ' IN full_name) > 0
        """)
        
        op.execute("""
            UPDATE "user" 
            SET 
                first_name = full_name,
                last_name = ''
            WHERE full_name IS NOT NULL AND POSITION(' ' IN full_name) = 0
        """)


def downgrade():
    # Remove added columns if needed
    inspector = sa.inspect(op.get_bind())
    columns = [col['name'] for col in inspector.get_columns('user')]
    
    if 'credits_balance' in columns:
        op.drop_column('user', 'credits_balance')
    
    if 'created_at' in columns:
        op.drop_column('user', 'created_at')
    
    if 'updated_at' in columns:
        op.drop_column('user', 'updated_at')
    
    if 'role' in columns:
        op.drop_column('user', 'role')
    
    # If we added first_name and last_name but want to revert to only full_name
    if 'first_name' in columns and 'last_name' in columns and 'full_name' in columns:
        # Ensure full_name has the combined data before dropping the separate columns
        op.execute("""
            UPDATE "user" 
            SET full_name = CONCAT_WS(' ', first_name, last_name)
            WHERE (first_name IS NOT NULL OR last_name IS NOT NULL) 
              AND (full_name IS NULL OR full_name = '')
        """)
        
        # Drop the first_name and last_name columns
        op.drop_column('user', 'first_name')
        op.drop_column('user', 'last_name')