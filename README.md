copy keypair form local to ec2 instance using secure copy (scp) command
step 1: (on local)
chmod 400 Ansible-master-keypair.pem
step 2: (on AMI server)
chmod 700 keys/
step 3: (on AMI server)
chown ubuntu:ubuntu /home/ubuntu/keys
step 4: (on local)
sudo scp -i "Ansible-master-keypair.pem" Ansible-master-keypair.pem (key pair name) ubuntu@ec2-13-233-166-127.ap-south-1.compute.amazonaws.com:/home/ubuntu/keys(path to derectory)
