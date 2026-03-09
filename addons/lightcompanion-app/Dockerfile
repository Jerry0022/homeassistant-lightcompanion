ARG BUILD_FROM
FROM ${BUILD_FROM}

WORKDIR /app

RUN apk add --no-cache bash curl python3 py3-pip

COPY requirements.txt /app/requirements.txt
RUN python3 -m venv /opt/venv \
    && /opt/venv/bin/pip install --no-cache-dir --upgrade pip \
    && if [ -s /app/requirements.txt ]; then /opt/venv/bin/pip install --no-cache-dir -r /app/requirements.txt; fi

COPY app /app/app
COPY run.sh /run.sh
RUN chmod +x /run.sh

ENV PATH="/opt/venv/bin:${PATH}"

EXPOSE 8099
CMD ["/run.sh"]
